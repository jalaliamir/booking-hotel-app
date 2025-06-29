import useFetch from '../../hooks/useFetch';

function LocationList() {
  const { data, isLoading } = useFetch('http://localhost:5000/hotels', '');
  if (isLoading) <p>loading...</p>;
  return (
    <div className='nearbyLocations'>
      <h2>Nearby Locations</h2>
      <div className='locationList'>
        {data.map((item) => {
          return (
            <div className='locationItem' key={item.id}>
              <img src={item.thumbnail_url} alt={item.name} />
              <div className='locationItemDesc'>
                <p className='location'>{item.smart_location}</p>
                <p className='name'>{item.name}</p>
                <p className='price'>
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
