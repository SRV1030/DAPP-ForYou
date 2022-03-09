import Layout from "../../../../components/Layout";
import { Table, Icon, Message } from "semantic-ui-react";
import Campaign from "../../../../../ethereum/campaign";
import ErrorPage from "next/error";
import Header from "../../../../components/elements/Header";
import RequestRow from "../../../../components/elements/RequestRow";
import { useState } from "react";
import { useRouter } from 'next/router';

const { Header: HeaderTable, HeaderCell, Row, Body } = Table;
const RequestIndex = (props) => {
    if (props.err) {
        // ERROR HANDLING IF QUERY IS WRONGLY ENTERED
        return <ErrorPage statusCode={404} />
    }
    const router=useRouter();
    const { address, requests, requestsCount, approversCount } = props;
    const [msg, setmsg] = useState({ header: '', message: '' });
    const callback = ( msgHeader, msgContent) => {
        setmsg({header:msgHeader,message:msgContent});
        setTimeout(() => {
            router.replace(`/campaign/${address}/request`);
        }, 2000);
    }
    const renderRow = () => {
        return requests.map((r, i) => {
            return <RequestRow callback={callback} key={i} id={i} approversCount={approversCount} request={r} address={address} />
        });
    }
    return <>
        <Layout>
            <Header add route={`/campaign/${address}/request/new`} text="View Requests" divider />
                {msg.header==="Congratulations"  && <Message success header={msg.header} content={msg.message} />}
                {msg.header==='Error'&& <Message error  header={msg.header} content={msg.message} />}
            <Table style={{ marginTop: '5rem' }} striped celled textAlign="center">
                <HeaderTable>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell><Icon name="ethereum" />Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>ApprovalsCount</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </HeaderTable>
                <Body>
                    {renderRow()}
                </Body>
            </Table>
            <div>Found {requestsCount} requests</div>
        </Layout>
    </>
}

export async function getServerSideProps(ctx) {
    try {
        const address = ctx.params.address;
        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.requestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(//Resolve all promises at once
            Array(parseInt(requestsCount)).fill().map((_element, ind) => {//.fill an array with the value in map
                return campaign.methods.requests(ind).call();
            })
        );
        console.log(requests);
        return {
            props: { address, requests: JSON.parse(JSON.stringify(requests)), requestsCount, approversCount }
        }
    } catch (err) {
        return { props: err };
    }
}

export default RequestIndex