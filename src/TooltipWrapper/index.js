import styles from './styles.module.css';
const TooltipWrapper = (props) => {
  return (
    <div className={styles.wrapperOuter}>
      <div className={styles.wrapper}>
        {props.children}
      </div>
    </div>
  )
}

export default TooltipWrapper;
