import PropTypes from 'prop-types';
import React from 'react';

function GenericInput(props) {
  const { data, value, handler } = props;

  return (
    <div className="flex flex-col w-[23.188rem] h-[7rem]">
      <label
        htmlFor={ data.id }
        className={ `w-[19.875rem] h-[2.625rem] font-normal text-2xl
        self-center` }
      >
        { data.role }
      </label>
      <input
        id={ data.id }
        placeholder={ data.placeholder }
        data-testid={ data.testId }
        value={ value }
        onChange={ (event) => handler(event) }
        className={ `w-[23.188rem] h-[4.375rem] text-2xl font-normal align-middle
        p-6 border border-[#001813] rounded-[5px]` }
      />
    </div>
  );
}

GenericInput.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    placeholder: PropTypes.string,
    role: PropTypes.string,
    testId: PropTypes.string,
  }).isRequired,
  handler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default GenericInput;
