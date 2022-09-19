import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  faculty: string;
  year: any;
};

export function SubjectCopyrightCard(props: Props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          著作権表記
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          この資料は京都大学OCWウェブサイトに掲載されている
          {props.title}の資料であり、その著作権は{props.faculty}に帰属します。
          Copyright {props.year} {props.faculty}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
