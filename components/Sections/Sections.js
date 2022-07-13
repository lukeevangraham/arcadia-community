import FeatureRowsGroup from "../Sections/FeatureRowsGroup/FeatureRowsGroup";
import RichText from "./RichText/RichText";
import PhotoShowcase from "./PhotoShowcase/PhotoShowcase";

// MAP STRAPI SECTIONS TO SECTION COMPONENTS
const sectionComponents = {
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.rich-text": RichText,
  "sections.photo-showcase": PhotoShowcase,
};

// DISPLAY A SECTION INDIVIDUALLY
const Section = ({ sectionData }) => {
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }

  // DISPLAY THE SECTION
  return <SectionComponent data={sectionData} />;
};

const Sections = ({ sections }) => (
  <>
    {sections.map((section, index) => (
      <Section sectionData={section} key={index} />
    ))}
  </>
);

export default Sections;
