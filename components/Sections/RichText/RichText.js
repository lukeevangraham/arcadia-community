const RichText = ({ data }) => (
  <section>
    <div className="row">
      <div className="u-line-width-limited">
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </div>
    </div>
  </section>
);

export default RichText;
