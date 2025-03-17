const getPeerId = () => {
  const searchParams = new URLSearchParams(document.location.search);
  return searchParams.get("id");
};

export default getPeerId;
