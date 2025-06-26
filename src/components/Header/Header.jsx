/* eslint-disable no-unused-vars */
import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
function Header() {
  const [destination, setDestination] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'inc' ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className='header'>
      <div className='headerSearch'>
        <div className='headerSearchItem'>
          <MdLocationOn className='headerIcon locationIcon' />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type='text'
            name='destination'
            placeholder='where to go?'
            className='headerSearchInput'
          />
          <span className='seperator'></span>
        </div>
        <div className='headerSearchItem'>
          <HiCalendar className='headerIcon dateIcon' />
          <div onClick={() => setOpenDate(!openDate)} className='dateDropDown'>
            {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
          </div>
          {openDate && (
            <DateRange
              minDate={new Date()}
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className='date'
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className='seperator'></span>
        </div>
        <div className='headerSearchItem'>
          <div id='optionDropDown' onClick={() => setOpenOptions(!openOptions)}>
            1 adult &bull; 2 children &bull; 1 room
          </div>
          {openOptions && (
            <GuestOptionList handleOptions={handleOptions} options={options} setOpenOptions={setOpenOptions} />
          )}
          <span className='seperator'></span>
        </div>
        <div className='headerSearchItem'>
          <button className='headerSearchBtn'>
            <HiSearch className='headerIcon' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, 'optionDropDown', () => setOpenOptions(false));
  return (
    <div className='guestOptions' ref={optionsRef}>
      <OptionItem handleOptions={handleOptions} type='adult' options={options} minLimit={1} />
      <OptionItem handleOptions={handleOptions} type='children' options={options} minLimit={0} />
      <OptionItem handleOptions={handleOptions} type='room' options={options} minLimit={1} />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className='guestOptionItem'>
      <span className='optionText'>{type}</span>
      <div className='optionCounter'>
        <button
          onClick={() => handleOptions(type, 'dec')}
          className='optionCounterBtn'
          disabled={options[type] <= minLimit}
        >
          <HiMinus className='icon' />
        </button>
        <span className='optionCounterNumber'>{options[type]}</span>
        <button className='optionCounterBtn' onClick={() => handleOptions(type, 'inc')}>
          <HiPlus className='icon' />
        </button>
      </div>
    </div>
  );
}
