/* Screen Sizes */
/* xs: 480px */ 
/* ss: 620px */
/* sm: 768px */
/* md: 1060px */
/* lg: 1200px */
/* xl: 1700px */


const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading1: "font-opensans font-bold lg:text-[60px] lg:leading-[64px] sm:text-[52px] sm:leading-[56px] xs:text-[44px] xs:leading-[48px] text-[36px] leading-[40px]",
  heading2: "font-opensans font-semibold lg:text-[44px] lg:leading-[48px] sm:text-[40px] sm:leading-[44px] xs:text-[36px] xs:leading-[40px] text-[32px] leading-[36px]",
  heading3: "font-opensans font-medium lg:text-[36px] lg:leading-[40px] sm:text-[32px] sm:leading-[36px] xs:text-[28px] xs:leading-[32px] text-[24px] leading-[28px]",
  heading4: "font-opensans font-medium lg:text-[32px] lg:leading-[36px] sm:text-[28px] sm:leading-[32px] xs:text-[24px] xs:leading-[28px] text-[20px] leading-[24px]",
  heading5: "font-opensans font-medium lg:text-[28px] lg:leading-[32px] sm:text-[24px] sm:leading-[28px] xs:text-[20px] xs:leading-[24px] text-[16px] leading-[20px]",
  heading6: "font-opensans font-medium lg:text-[24px] lg:leading-[28px] sm:text-[20px] sm:leading-[24px] xs:text-[16px] xs:leading-[20px] text-[14px] leading-[18px]",
  paragraph: "font-opensans lg:text-[16px] sm:text-[15px] text-[14px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-start",
  flexEnd: "flex justify-end items-end",

  paddingX: "sm:px-10 px-5",
  paddingY: "sm:py-10 py-5",
  padding: "sm:p-10 p-5",

  marginX: "sm:mx-10 mx-5",
  marginY: "sm:my-10 my-5",
  margin: "sm:m-10 m-5",

  section: `flex md:flex-row flex-col sm:py-10 py-5`,
  sectionImg: `flex-1 flex justify-center items-center`,
  sectionInfo: `flex-1 flex justify-center items-start flex-col`,

  borderBox: "shadow-lg shadow-light border-2 border-light",
  shadow: "shadow-md shadow-gray"
};

export default styles;