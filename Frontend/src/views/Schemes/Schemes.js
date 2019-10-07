import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from 'components/Card/Card';
import  CardHeader from 'components/Card/CardHeader';
import  CardBody from 'components/Card/CardBody';



const schemes = [
  {
    title: "Soil Health Card Scheme",
    content:
      "Launched in 2015, the scheme has been introduced to assist State Governments to issue Soil Health Cards to all farmers in the country.  The Soil Health Cards provide information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients to be applied for improving soil health and its fertility"
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    content:
      "PMFBY is an actuarial premium based scheme under which farmer has to pay maximum premium of 2% for Kharif, 1.5% for Rabi food & oilseed crops and 5% for annual commercial/horticultural crops and remaining part of the actuarial/bidded premium is shared equally by the Centre and State Government."
  },
  {
    title: "Neem Coated Urea (NCU)",
    content:
      "It was launched on 1st July, 2015 with the motto of ‘Har Khet Ko Paani’ for providing end-to end solutions in irrigation supply chain, viz. water sources, distribution network and farm level applications. "
  },
  {
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    content:
      "It is implemented with a view to promote organic farming in the country. To improve soil health and organic matter content and increase net income of the farmer so as to realise premium prices.  Under this scheme, an area of 5 lakh acre is targeted to be covered though 10,000 clusters of 50 acre each, from the year 2015-16 to 2017-18. "
  },
  {
    title: "Micro Irrigation Fund (MIF) ",
    content:
      "A dedicated MIF created with NABARD has been approved with an initial corpus of Rs. 5000 crore (Rs. 2000 crore for 2018-19 & Rs. 3000 crore for 2019-20) for encouraging public and private investments in Micro irrigation. The main objective of the fund is to facilitate the States in mobilizing the resources for expanding coverage of Micro Irrigation. "
  }
];

export default function Schemes() {
  return (
  <GridContainer>
      {schemes.map((item) => 
          // eslint-disable-next-line react/jsx-key
          <GridItem>
              <Card>
                  <CardHeader><b>{item.title}</b></CardHeader>
                  <CardBody>{item.content}</CardBody>
              </Card>
          </GridItem>
      )}
  </GridContainer>
  )}
