import { Form, Button, Input, Label, Message, } from "semantic-ui-react";
import { useState } from "react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { useRouter } from "next/router"

const ContributeForm = (props) => {
    const router = useRouter();
    const [inputAmount, setinputAmount] = useState('');
    const [loading, setloading] = useState(false)
    const [msg, setmsg] = useState({ header: '', message: '' });
    const onChangeHandler = (event) => {
        setinputAmount(event.target.value);
        // console.log(inputAmount);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        //Create Campaign using dactory instance
        const contactAddress = props.contractaddress;
        if (Number(inputAmount) <= Number(web3.utils.fromWei(props.mc, 'ether'))) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please contributean amount greater than or equal to minimum contribution'
            })
            return;
        }
        setloading(true);
        setmsg({ header: '', message: '' });
        try {
            setmsg({ header: "Transaction", message: "Waiting on Transaction success..." });
            const campaign = Campaign(contactAddress);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(inputAmount, 'ether'),
            });

            setmsg({ header: "Congratulations", message: "You've succssfully donated" });
            setTimeout(() => {
                router.replace('/campaign/' + contactAddress);
                setTimeout(() => {
                    setmsg({ header: '', message: '' });
                    setinputAmount('');
                }, 4000);
            }, 1000);
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
    return (
        <>
            <Form style={props.style} onSubmit={onSubmitHandler} error={msg.header === 'Error'} success={msg.header === "Congratulations"}>
                <Form.Field style={{ marginBottom: '4px' }}>
                    <Input
                        labelPosition="right"
                        type="number"
                        placeholder="Amount"
                    >
                        <Label basic>&#9830;</Label>
                        <input value={inputAmount} onChange={onChangeHandler} />
                        <Label>ETH</Label>
                    </Input>
                </Form.Field>
                <Button primary loading={loading} type="submit">
                    CONTRIBUTE
                </Button>
                <Message success header={msg.header} content={msg.message} />
                <Message error header={msg.header} content={msg.message} />
            </Form>
        </>
    )
}

export default ContributeForm;