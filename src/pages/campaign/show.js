import Layout from "src/components/Layout";

const CampaignShow = () => {
    return (
        <>
            <Layout>
                <h3>Campaign Element</h3>
            </Layout>
        </>
    )
}
export async function getServerSideProps(context) {
    //  Runs only on the server. and works for every incoming request
//   //should be used whe we need req,res or if we want to regenerate page multiple times
    // console.log(context);
    const address = context.query.address;
    // const CampaignList = await factory.methods.getCampaigns().call();
    return {
      props: {
        address: address
      },
    }
  
  }
export default CampaignShow;