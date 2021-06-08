import React from "react";
import JobPostingCard from "@components/JobPostingCard";

const Home: React.FC = (pageprops) => {
  return (
    <JobPostingCard companyName="Company" location="Location" title="Software Engineer" experienceYears={5} isRemote>
      witam szefa
    </JobPostingCard>
  );
};

export default Home;
