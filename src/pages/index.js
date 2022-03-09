import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../components/Layout';
import Link  from 'next/link';
const Home = (props) => {
  const renderCampaigns = () => {
    const items = props.campaigns.map(
      address => {
        return {
          header: <span
            className="header"
            style={{
              whiteSpace: 'nowrap',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{address}</span>,
          description: (
            <Link href={`campaign/${address}`}>
              View Campaign
            </Link>
          ),
          fluid: true,
          color: 'green'
        }
      }
    );
    return <Card.Group items={items} />
  }

  return (
    <>
      <Layout>
        <h3>Open Campaigns</h3>
        <Link href="/campaign/new">
          <Button floated="right" primary animated='fade'>
            <Button.Content visible><Icon name='add circle' /> Create Campaign</Button.Content>
            <Button.Content hidden><Icon name='handshake outline' size='large' /></Button.Content>
          </Button>
        </Link>
        {renderCampaigns()}
      </Layout>
    </>
  )
}


export async function getStaticProps() {
  // Pre defind by next js which it calls whle pre-rendering
  //static re-rendering
  // use for api or read files
  //Data Could be outDated without revalidate so if we set revalidate:10 then we could revalidate data after 10 second
  const CampaignList = await factory.methods.getCampaigns().call();
  console.log(CampaignList);
  return {
    props: {
      campaigns: CampaignList
    },
    revalidate: 10
  }

}
export default Home;