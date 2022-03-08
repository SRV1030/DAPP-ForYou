import { Table, Label, Button, Icon } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { useState } from "react";

const { Row, Cell } = Table;
const RequestRow = (props) => {
    const [aLoading, setaLoading] = useState(false);
    const [fLoading, setfLoading] = useState(false);
    const { request, callback, id, approversCount, address } = props;
    const { description, value, recipient, approvalCount, complete } = request;
    const readyToFinalize = approvalCount > (approversCount / 2);
    const approveHandler = async () => {
        try {
            setaLoading(true);
            callback('Transaction', 'Waiting on Transaction success...');
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(id).send({ from: accounts[0] });
            callback("Congratulations", 'Request has been Approved successfully');
        } catch (err) {
            let message = '';
            if (err.code === 4001) {
                message = err.message.split(":")[1];
            } else {
                message = err.message;
            }
            callback('Error', message);
        }
        setaLoading(false);
    }

    const finalizeHandler = async () => {
        try {
            setfLoading(true);
            callback('Transaction', 'Waiting on Transaction success...');
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
            callback("Congratulations", 'Request has been Finalized successfull');
        } catch (err) {
            let message = '';
            if (err.code === 4001) {
                message = err.message.split(":")[1];
            } else {
                message = err.message;
            }
            callback('Error', message);
        }

        setfLoading(false);
    }
    return <>
        <Row disabled={complete} positive={readyToFinalize && !complete}>
            <Cell><Label ribbon>{id}</Label></Cell>
            <Cell>{description}</Cell>
            <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
            <Cell>{recipient}</Cell>
            <Cell>{approvalCount}/{approversCount}</Cell>
            <Cell>
                {
                    complete
                        ? (
                            <Icon color='green' name='checkmark' size='large' />
                        )
                        : <Button onClick={approveHandler} disabled={aLoading} loading={aLoading}  color="green" basic>Approve</Button>
                }
            </Cell>
            <Cell>
                {
                    complete
                        ? (
                            <Icon color='green' name='checkmark' size='large' />
                        )
                        : <Button onClick={finalizeHandler} disabled={fLoading} loading={fLoading}  color="teal" basic>Finalize</Button>
                }
            </Cell>
        </Row>
    </>
}
export default RequestRow;