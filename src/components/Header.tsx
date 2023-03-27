import { Link, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <Typography variant="h1" fontWeight="bold" noWrap={false}>
        สถิติประชากรกรุงเทพฯ พ.ศ. 2550 - 2559
      </Typography>

      <Typography variant="h3" fontWeight="bold" noWrap={false} pt={3}>
        ลักษณะพื้นที่
      </Typography>

      <Typography pt={1.5}>
        กรุงเทพฯ เป็นจังหวัดที่มีประชากรมากที่สุดในประเทศไทย
        หากรวมประชากรแฝงที่ไม่ปรากฏในทะเบียนและคนที่
        เดินทางมาทำงานในตอนกลางวันด้วยแล้ว
        คาดว่าจะสูงถึงเกือบเท่าตัวของประชากรที่ปรากฏในทะเบียน เราจึง
        เรียกกรุงเทพฯ ว่าเป็น{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Megacity"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          “อภิมหานคร (megacity)”
        </Link>{" "}
        คือมีประชากรตั้งแต่ 10 ล้านคนขึ้นไป
      </Typography>

      <Typography pt={3}>
        อัตราเพิ่มของประชากรกรุงเทพฯ อยู่ระดับเกือบ 1% และเริ่มลดลงในปี 2559
        ดังแสดงในแผนภูมิต่อไปนี้
      </Typography>
    </>
  );
};

export default Header;
