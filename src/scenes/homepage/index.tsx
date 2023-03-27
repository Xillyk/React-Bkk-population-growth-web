import { Box } from "@mui/material";
import Footer from "@/components/Footer"
import Header from "@/components/Header";
import Content from "@/components/Content";


const Homepage = () => {
  return (
    <Box
			width="80%"
			height="100%"
			display="flex"
			marginX="auto"
			paddingY="2rem"
		>
			<Box>
				{/* HEADER */}
				<Box>
					<Header />
				</Box>

				{/* CHART */}
				<Box pt={6}>
					<Content />
				</Box>

				{/* FOOTER */}
				<Box pt={5}>
					<Footer />
				</Box>
			</Box>
    </Box>
  );
};

export default Homepage;
