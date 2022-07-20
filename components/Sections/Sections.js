import FeatureRowsGroup from "../Sections/FeatureRowsGroup/FeatureRowsGroup";
import RichText from "./RichText/RichText";
import PhotoShowcase from "./PhotoShowcase/PhotoShowcase";
import Verse from "./Verse/Verse";

// MAP STRAPI SECTIONS TO SECTION COMPONENTS
const sectionComponents = {
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.rich-text": RichText,
  "sections.photo-showcase": PhotoShowcase,
  "sections.verse": Verse,
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
