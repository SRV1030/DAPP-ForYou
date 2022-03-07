import Layout from "src/components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "ethereum/web3";
import { Card, Grid } from "semantic-ui-react";
import ContributeForm from "src/components/templates/ContributeForm";

const CampaignShow = (props) => {

  const renderCards = () => {
    const { mc, cb, rc, ac, ma , ca} = props;
    const items = [
      {
        header: <span
          className="header"
          style={{
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>{ma}</span>,
        description:
          'The Manager created this campaign, and can create requests to withdraw money.',
        meta: 'Address of Manager',
      },
      {
        header: mc,
        description:
          'You must contribute at least ' + mc + ' (wei) to become an approver.',
        meta: 'Minimum Contribution (wei)',
      },
      {
        header: rc,
        description:
          'A request tries to withdraw money from a contract. Request must be approved by approvers.',
        meta: 'Number of Requests',
      },
      {
        header: ac,
        description:
          'Number of people who have already donated for this campaign.',
        meta: 'Number of Approvers',
      },
      {
        header: web3.utils.fromWei(cb, 'ether'),
        description: 'The Balance is how much money this campaign has left to sepnd.',
        meta: 'Campaign Balance (eth)'
      },
      {
        meta: <span style={{ marginBottom: '3px', textTransform: 'uppercase' }} className="meta">Contribute to this campaign</span>,
        description: <ContributeForm mc={mc} contractaddress={ca} style={{ textAlign: 'center', marginTop: '4px' }}/>
      }
    ];

    return <Card.Group centered items={items} />

  }

  return (
    <>
      <Layout>
        <h3>Campaign Element</h3>
        {renderCards()}
      </Layout>
    </>
  )
}
export async function getServerSideProps(context) {
  //  Runs only on the server. and works for every incoming request
  //   //should be used whe we need req,res or if we want to regenerate page multiple times
  // console.log(context);
  try {
    const address = context.query.address;
    const campaign = Campaign(address);
    const details = await campaign.methods.getCampaignDetails().call();
    console.log(details);
    const {
      0: mc, // minimumContribution
      1: cb, // campaignBalance
      2: rc, // requestsCount
      3: ac, // approversCount
      4: ma  // managerAddress
    } = details;

    return {
      props: { mc, cb, rc, ac, ma, ca: address } // ca = Contract Address;
    }
  } catch (err) {
    return { props: err };
  }


}
export default CampaignShow;