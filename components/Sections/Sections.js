import FeatureRowsGroup from "../Sections/FeatureRowsGroup/FeatureRowsGroup";
import RichText from "./RichText/RichText";

// MAP STRAPI SECTIONS TO SECTION COMPONENTS
const sectionComponents = {
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.rich-text": RichText
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
    {sections.map((section) => (
      <Section sectionData={section} key={section.id} />
    ))}
  </>
);

export default Sections;
