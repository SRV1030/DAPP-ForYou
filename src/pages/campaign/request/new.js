import Layout from "../../../components/Layout";
import Header from "../../../components/elements/Header";
import { Form, Container, Button, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";

const NewRequest = (props) => {
    const { address } = props;
    const [amount, setamount] = useState('');
    const [description, setdescription] = useState('');
    const [recipient, setrecipient] = useState('');
    const [loading, setloading] = useState(false)
    const [msg, setmsg] = useState({ header: '', message: '' });

    const inputHandler = (event) => {
        const { value, name } = event.target;
        if (name === "description") setdescription(value);
        else if (name === "amount") setamount(value);
        else setrecipient(value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (Number(amount) <= 0) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please fill the amount'
            })
            return;
        }
        else if (!web3.utils.isAddress(recipient)) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please enter a valid address'
            })
            return;
        }
        else if (!description.length) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please enter some description for reference'
            })
            return;
        }
        setloading(true);
        setmsg({ header: '', message: '' });
        try {
            setmsg({ header: "Transaction", message: "Waiting on Transaction success..." });
            const campaign = Campaign(address);
            console.log(campaign);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(amount, 'ether'), recipient).send({
                from: accounts[0],
            });
            setmsg({ header: "Congratulations", message: "You've successfully created request" });
        }
        catch (err) {
            let message = '';
            if (err.code === 4001) {
                message = err.message.split(":")[1];
            } else {
                message = err.message;
            }
            setmsg({
                header: 'Error',
                message: message
            });
        }
        setloading(false);
    }
    return <>
        <Layout>
            <Header
                back
                route={`/campaign/${address}/request`}
                text="Create A Request"
                divider
            />
            <Container textAlign="center" text>
                <Form
                    style={{ marginTop: "5rem" }}
                    onSubmit={submitHandler}
                    loading={loading}
                    error={msg.header === 'Error'}
                    success={msg.header === "Congratulations"}
                >

                    <Form.Field>
                        <label style={{ marginBottom: "4px" }} className="text-uppercase">
                            Request Description
                        </label>
                        <Input
                            required
                            onChange={inputHandler}
                            value={description}
                            name="description"
                            icon="question circle"
                            iconPosition="left"
                            placeholder="Description..."
                        />
                        <label
                            style={{ marginBottom: "4px", marginTop: "2rem" }}
                            className="text-uppercase"
                        >
                            Request Amount (ETH)
                        </label>
                        <Input
                            required
                            onChange={inputHandler}
                            type="number"
                            value={amount}
                            name="amount"
                            icon="money bill alternate"
                            iconPosition="left"
                            placeholder="Withdraw amount..."
                        />
                        <label style={{ marginTop: "2rem" }} className="text-uppercase">
                            Request Recipient
                        </label>
                        <Input
                            required
                            onChange={inputHandler}
                            value={recipient}
                            name="recipient"
                            icon="ethereum"
                            iconPosition="left"
                            placeholder="Recipient address..."
                        />
                    </Form.Field>
                    <Button primary type="submit" >
                        CREATE REQUEST
                    </Button>
                    <Message success header={msg.header} content={msg.message} />
                    <Message error header={msg.header} content={msg.message} />
                </Form>
            </Container>
        </Layout>
    </>
}
export async function getServerSideProps(ctx) {
    try {
        const address = ctx.query.address;
        return {
            props: { address }
        }
    } catch (err) {
        return { props: err };
    }
}
export default NewRequest;