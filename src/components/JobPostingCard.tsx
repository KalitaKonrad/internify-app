import React from "react";
import { Avatar, Box, Center, Flex, Heading, Text, Icon, Image, Theme, useTheme, Square } from "@chakra-ui/react";
import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

interface JobPostingCardProps {
  src?: string;
  companyName: string;
  location: string;
  title: string;
  isRemote?: boolean;
  maxSalary?: number;
  minSalary?: number;
  experienceYears?: number;
}

const JobPostingCard: React.FC<JobPostingCardProps> = ({
  src,
  companyName,
  location,
  title,
  isRemote,
  minSalary,
  maxSalary,
  experienceYears,
}) => {
  const theme: Theme = useTheme();

  const salary = minSalary && maxSalary ? `${minSalary} - ${maxSalary}` : "Undisclosed salary";
  const experience = experienceYears && `EXP: ${experienceYears} years`;

  return (
    <Box
      p={2}
      boxShadow={theme.shadows.md}
      borderRadius={6}
      borderLeft={`5px solid ${theme.colors.blue["400"]}`}
      transition="0.2s"
      _hover={{ borderLeft: `8px solid ${theme.colors.blue["400"]}`, cursor: "pointer" }}
      _focus={{ boxShadow: "outline" }}
    >
      <Flex justifyContent="space-between">
        <Flex>
          <Center>
            <Square size="80px">
              {src ? (
                <Image src={src} alt="company_logo" />
              ) : (
                <Avatar bg={theme.colors.white} loading="lazy" icon={<Icon as={FaBuilding} />} />
              )}
            </Square>
          </Center>
          <Center flexDirection="column" alignItems="flex-start">
            <Text fontSize="lg" fontWeight={500} mb={1} color={theme.colors.cyan["500"]}>
              {title}
            </Text>
            <Flex alignItems="center">
              <Flex alignItems="center" justifyContent="flex-start">
                <Text fontSize="md" color={theme.colors.gray["400"]} fontWeight={500}>
                  {companyName}
                </Text>
              </Flex>
              {isRemote && (
                <Flex borderRadius={5} bg={theme.colors.cyan["300"]} ml={2}>
                  <Text color={theme.colors.blue["700"]} mx={2} my={1} fontSize="sm">
                    Fully Remote
                  </Text>
                </Flex>
              )}
            </Flex>
          </Center>
        </Flex>
        <Flex direction="column">
          <Flex direction="column" justifyContent="space-between">
            {experienceYears && (
              <Flex justifyContent="flex-end" mr={1}>
                <Text pl={2} color={theme.colors.gray["400"]}>
                  {experience}
                </Text>
              </Flex>
            )}
            <Flex my={2} justifyContent="flex-end" mr={1} alignItems="center">
              <Text color={theme.colors.green["400"]} fontWeight={500}>
                {salary}
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent="flex-end" mr={1}>
            <Flex alignItems="center">
              <Icon as={FaMapMarkerAlt} mr={1} color={theme.colors.gray["500"]} />
              <Text fontSize="sm" color={theme.colors.gray["600"]}>
                {location}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default JobPostingCard;
