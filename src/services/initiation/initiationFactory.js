export const getInitiationStrategy = (name) => {
  return (name === undefined) ? false : name.function
}
