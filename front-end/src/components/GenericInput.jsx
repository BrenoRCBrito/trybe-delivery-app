import PropTypes from 'prop-types';
import React from 'react';

function GenericInput(props) {
  const { data, value, handler } = props;

  return (
    <label htmlFor={ data.id }>
      { data.role }
      <input
        id={ data.id }
        placeholder={ data.placeholder }
        data-testid={ data.testId }
        value={ value }
        onChange={ (event) => handler(event) }
      />
    </label>
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
