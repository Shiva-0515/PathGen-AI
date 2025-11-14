// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AppTheme from '../AppTheme';
// import AppAppBar from './AppAppBar';
// // import Footer from './Footer';

// export default function FAQ() {
//   const [expanded, setExpanded] = React.useState([]);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(
//       isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel),
//     );
//   };

//   return (
//     <AppTheme>
//       <AppAppBar />
//       <Container
//       id="faq"
//       sx={{
//         pt: { xs: 4, sm: 12 },
//         pb: { xs: 8, sm: 16 },
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: { xs: 3, sm: 6 },
//       }}
//     >
//       <Typography
//         component="h2"
//         variant="h4"
//         sx={{
//           color: 'text.primary',
//           width: { sm: '100%', md: '60%' },
//           textAlign: { sm: 'left', md: 'center' },
//         }}
//       >
//         Frequently asked questions
//       </Typography>
//       <Box sx={{ width: '100%' }}>
//         <Accordion
//           expanded={expanded.includes('panel1')}
//           onChange={handleChange('panel1')}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1d-content"
//             id="panel1d-header"
//           >
//             <Typography component="span" variant="subtitle2">
//               How do I contact customer support if I have a question or issue?
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography
//               variant="body2"
//               gutterBottom
//               sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//             >
//               You can reach our customer support team by emailing&nbsp;
//               <Link href="mailto:support@email.com">support@email.com</Link>
//               &nbsp;or calling our toll-free number. We&apos;re here to assist you
//               promptly.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion
//           expanded={expanded.includes('panel2')}
//           onChange={handleChange('panel2')}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel2d-content"
//             id="panel2d-header"
//           >
//             <Typography component="span" variant="subtitle2">
//               Can I return the product if it doesn&apos;t meet my expectations?
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography
//               variant="body2"
//               gutterBottom
//               sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//             >
//               Absolutely! We offer a hassle-free return policy. If you&apos;re not
//               completely satisfied, you can return the product within [number of
//               days] days for a full refund or exchange.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion
//           expanded={expanded.includes('panel3')}
//           onChange={handleChange('panel3')}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel3d-content"
//             id="panel3d-header"
//           >
//             <Typography component="span" variant="subtitle2">
//               What makes your product stand out from others in the market?
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography
//               variant="body2"
//               gutterBottom
//               sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//             >
//               Our product distinguishes itself through its adaptability, durability,
//               and innovative features. We prioritize user satisfaction and
//               continually strive to exceed expectations in every aspect.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion
//           expanded={expanded.includes('panel4')}
//           onChange={handleChange('panel4')}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel4d-content"
//             id="panel4d-header"
//           >
//             <Typography component="span" variant="subtitle2">
//               Is there a warranty on the product, and what does it cover?
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography
//               variant="body2"
//               gutterBottom
//               sx={{ maxWidth: { sm: '100%', md: '70%' } }}
//             >
//               Yes, our product comes with a [length of warranty] warranty. It covers
//               defects in materials and workmanship. If you encounter any issues
//               covered by the warranty, please contact our customer support for
//               assistance.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       </Box>
//     </Container>
//       {/* <Footer/> */}
//       </AppTheme>
//   );
// }


import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppTheme from '../AppTheme';
import AppAppBar from './AppAppBar';
// import Footer from './Footer';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(
      isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel)
    );
  };

  return (
    <AppTheme>
      <AppAppBar />
      <Container
        id="faq"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{
            color: 'text.primary',
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          Frequently Asked Questions
        </Typography>

        <Box sx={{ width: '100%' }}>
          <Accordion
            expanded={expanded.includes('panel1')}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography component="span" variant="subtitle2">
                How do I generate a personalized learning roadmap?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                Simply provide your learning goals, current knowledge level, and preferred topics. Our AI will generate a step-by-step roadmap tailored to your needs, ensuring you focus on the most relevant content.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded.includes('panel2')}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography component="span" variant="subtitle2">
                How does the AI evaluate my knowledge using MCQs?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                After completing a quiz, our AI evaluates your answers instantly, providing detailed feedback and insights. It highlights areas you need to focus on to improve and adapts future quizzes to your skill level.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded.includes('panel3')}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography component="span" variant="subtitle2">
                Can I track my progress over time?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                {/* Yes! The platform provides a dashboard that tracks your completed topics, quiz performance, and roadmap progress. This helps you visualize your improvement and adjust your learning plan accordingly. */}
              Not yet! The platform is currently in its initial stage, but progress tracking will be available to users soon.              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded.includes('panel4')}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography component="span" variant="subtitle2">
                Is my data and progress private and secure?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                Absolutely. We use secure data storage practices to protect your personal information, learning data, and quiz results. Your progress is only accessible to you unless you choose to share it.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
      {/* <Footer /> */}
    </AppTheme>
  );
}
