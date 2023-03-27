import { Box, Link, ListItem, List, Typography } from "@mui/material";

const dataList = [
  {
    text: "สำนักบริหารการทะเบียน กรมการปกครอง กระทรวงมหาดไทย, จำนวนประชากร, สำนักบริหารการทะเบียน กรมการปกครอง กระทรวงมหาดไทย, Editor. 2564: กรุงเทพฯ.",
    link: "https://stat.bora.dopa.go.th/stat/statnew/statMONTH/statmonth/",
  },
  {
    text: "สำนักงานสถิติแห่งชาติ, การสำรวจภาวะเศรษฐกิจและสังคมของครัวเรือน พ.ศ. 2563 สำนักงานสถิติแห่งชาติ, Editor. 2563: กรุงเทพฯ",
    link: "http://www.nso.go.th/",
  },
  {
    text: "สำนักดัชนีเศรษฐกิจการค้า กระทรวงพาณิชย์, ข้อมูลดัชนีราคาผู้บริโภคทั่วไป, สำนักดัชนีเศรษฐกิจการค้า กระทรวงพาณิชย์, Editor. 2563: กรุงเทพฯ.",
    link: "http://www.price.moc.go.th/",
  },
];

const Footer = () => {
  return (
    <>
      <Typography variant="h3" fontWeight="bold">
        แหล่งข้อมูล
      </Typography>

      <Box pt="15px" pl={4}>
        <List>
          {dataList.map((data) => (
            <Link href={data.link} target="_blank" rel="noreferrer">
              <ListItem
                disablePadding
                sx={{
                  pl: 2,
                  listStyleType: "disc",
                  listStylePosition: "outside",
                  display: "list-item",
                }}
              >
                {data.text}
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Footer;
