import Layout from "src/components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "ethereum/web3";
import { Card, Divider, Button, Grid } from "semantic-ui-react";
import { Link } from '../../hooks/routes'
import Header from "src/components/elements/Header";
import ContributeForm from "src/components/templates/ContributeForm";

const CampaignShow = (props) => {
  const { mc, cb, rc, ac, ma, ca } = props;
  const renderCards = () => {
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
        description: <ContributeForm mc={mc} contractaddress={ca} style={{ textAlign: 'center', marginTop: '4px' }} />
      }
    ];

    return <Card.Group centered items={items} />

  }

  return (
    <>
      <Layout>
        <h3>Campaign Element</h3>
        {renderCards()}
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header style={{ marginTop: '5rem' }} text="Campaign Requests" divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaign/${ca}/request`}>
                <a>
                  <Button
                    style={{ display: 'flex', justifyContent: 'center' }}
                    color='red'
                    content='View Requests'
                    icon='bullhorn'
                    label={{ basic: true, color: 'red', pointing: 'left', content: rc }}
                  />
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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