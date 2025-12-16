import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ModernDatePicker.css';

// Custom Input Component to match our existing styled input
const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <div className="modern-date-wrapper" onClick={onClick} ref={ref}>
        <i className="fas fa-calendar-alt modern-date-icon"></i>
        <input
            type="text"
            className="form-control modern-date-input"
            value={value}
            readOnly
            placeholder={placeholder}
        />
    </div>
));

const ModernDatePicker = ({ selected, onChange, placeholderText, minDate, maxDate }) => {
    return (
        <DatePicker
            selected={selected}
            onChange={onChange}
            customInput={<CustomDateInput placeholder={placeholderText} />}
            dateFormat="yyyy-MM-dd"
            placeholderText={placeholderText}
            minDate={minDate}
            maxDate={maxDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            popperPlacement="bottom-start"
            className="modern-datepicker-popper"
            calendarClassName="modern-calendar"
        />
    );
};

export default ModernDatePicker;
