export interface HeroSection {
  title: string;
  image: {
      sys: {
          id: string;
          linkType: string;
          type: string;
      };
  };
}