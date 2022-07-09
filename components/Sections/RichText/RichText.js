const RichText = ({ data }) => (
  <section>
    <div className="row">
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  </section>
);

export default RichText;
