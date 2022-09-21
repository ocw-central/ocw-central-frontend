// https://github.com/ebisucom/next-react-website/blob/main/blog/components/container.js
import styles from "@/styles/container.module.css";

type Props = {
  children: React.ReactNode;
};

export function Container(props: Props) {
  return (
    <div className={props.large ? styles.large : styles.default}>
      {props.children}
    </div>
  );
}
