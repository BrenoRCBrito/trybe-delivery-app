import PropTypes from 'prop-types';
import React from 'react';

function GenericInput(props) {
  const { data, value, handler } = props;

  return (
    <div className="flex flex-col w-[87%] h-[13vh] justify-between">
      <label
        htmlFor={ data.id }
        className="font-normal text-2xl my-auto ml-3"
      >
        { data.role }
      </label>
      <input
        id={ data.id }
        placeholder={ data.placeholder }
        data-testid={ data.testId }
        value={ value }
        onChange={ (event) => handler(event) }
        className="text-2xl font-normal p-[2.45vh] border border-[#001813] rounded-[5px]"
        // type={ data.role === 'Senha' ? 'password' : 'text' }
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
