import data from "../lang.json";

const DataPage = () => {
  return (
    <div>
      <p>Languages</p>
      <DataList></DataList>
    </div>
  );
};

const DataList = () => {
  return (
    <>
      {data.map((item) => {
        return (
          <div>
            {item.lang}
            <span> - {item.value}</span>
          </div>
        );
      })}
    </>
  );
};

export default DataPage;
