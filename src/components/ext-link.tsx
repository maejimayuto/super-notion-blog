const ExtLink = (props: any) => (
  <a {...props} rel="noopener" target={props.target || '_blank'} />
)
export default ExtLink
