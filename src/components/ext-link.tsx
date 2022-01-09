const ExtLink = (props: any) => (
  <a {...props} rel="noopener noreferrer" target={props.target || '_blank'} />
)
export default ExtLink
