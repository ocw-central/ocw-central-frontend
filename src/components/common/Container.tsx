import styles from "@/styles/container.module.css";

type Props = {
  children: React.ReactNode;
};

export function Container(props: Props) {
  return <div className={styles.default}>{props.children}</div>;
}
