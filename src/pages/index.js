import { Card, Button } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from 'src/components/Layout';

const Home = (props) => {

  const renderCampaigns = () => {
    const items = props.campaigns.map(
      address => {
        return {
          header: address,
          description: <a>View Campaign</a>,
          fluid: true
        }
      }
    );
    return <Card.Group items={items} />
  }

  return (
    <Layout>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <h3>Open Campaigns</h3>
      <Button floated="right" content='Create Campaign' icon='add circle' primary />
      {renderCampaigns()}
      </Layout>
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