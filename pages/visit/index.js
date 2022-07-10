import { fetchAPI } from "../../lib/api";
import Layout from "../../components/Layout/Layout";

export async function getStaticProps() {
  const [globalData, visitData] = await Promise.all([
    fetchAPI("/global?populate=deep"),
    fetchAPI("/visit?populate=deep"),
  ]);
  return {
    props: { globalData, visitData },
    revalidate: 1,
  };
}

const Visit = ({ globalData, visitData }) => (
  <Layout globalData={globalData}>
    <div className="row">
      <div className="u-section-heading">
        <h1>Join Us Sunday</h1>
        <h4>
          &quot;Let us consider one another in order to stir up love and good
          works&quot; Hebrews 10:24
        </h4>
      </div>

      <h2>Getting to know each other</h2>
      <p className="u-margin-bottom-medium">
        “We know meeting someone for the first time can be intimidating, and
        going to a new church for the first time can be nerve-racking. We want
        to help make your first experience at Arcadia Community Church a great
        one.
      </p>
      <h3>Service Time</h3>
      <p className="u-margin-bottom-medium">
        <strong>Sundays</strong> at <strong> 10:30am</strong>
      </p>
      <h3>Location & Directions</h3>
      <p className="u-margin-bottom-medium">
        121 Alice Street
        <br />
        Arcadia, CA 91006-3926
      </p>
      <h3>Parking</h3>
      <p className="u-margin-bottom-medium">
        There are parking lots on the north and south side of the church. Street
        parking is also permitted. Handicapped parking is found in the north
        parking lot (on Genoa St.)
      </p>
      <h2 className="u-margin-bottom-medium">What can I expect?</h2>
      <h3>How long is an Arcadia Community Church Service?</h3>
      <p className="u-margin-bottom-medium">
        In total, an Arcadia Community Church service is about 60 minutes in
        length. Services begin with the Arcadia Community Church band leading
        the church in music - song lyrics are projected onto the screens so you
        can sing along and/or engage with worship however you feel most
        comfortable. After the music portion of service is complete, one of our
        pastors will come out to share an encouraging and hope-filled message
        about Jesus.
      </p>
      <h3>What's the culture like at Arcadia Community Church?</h3>
      <p className="u-margin-bottom-medium">
        Sunday’s at Arcadia Community Church are exciting, casual, and relaxed.
        Come as you are and expect to feel welcomed as our guest.
      </p>
      <h3>What about my kids?</h3>
      <p className="u-margin-bottom-medium">
        We believe that kids should have a blast at church every single week -
        and at Arcadia Kids, we make this a priority. The other thing we make a
        priority is your children’s safety. Because of that, we have a detailed
        check-in process for our Arcadia Kids program the first time that you
        visit. You’ll want to leave yourself an extra ten minutes to get signed
        in for the Arcadia Kids experience. Arcadia Kids is offered for kids
        ages infant through Grade 8.
      </p>
    </div>
  </Layout>
);

export default Visit;
