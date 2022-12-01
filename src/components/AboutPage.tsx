import { theme } from "@/utils/themes";
import { Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <Grid
      container
      className="About"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        direction: "column",
        my: 2,
      }}
    >
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          {t("translation.about.about")}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          {t("translation.about.about_message")}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          {t("translation.about.license")}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          {t("translation.about.license_sentence1")}
          <Link
            color="primary"
            underline="always"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja"
          >
            {t("translation.about.license_sentence2")}
          </Link>
          {t("translation.about.license_sentence3")}
          <br />
          {t("translation.about.license_sentence4")}
          <Link
            color="primary"
            underline="always"
            href="https://github.com/ocw-central"
          >
            GitHub
          </Link>
          {t("translation.about.license_sentence5")}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          {t("translation.about.disclaimer")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          {t("translation.about.disclaimer_sentence")}
        </Typography>
        <br />
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 0,
          }}
        >
          {t("translation.about.contact")}
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          <address>feedback@ocwcentral.com</address>
        </Typography>
      </Grid>
    </Grid>
  );
}
