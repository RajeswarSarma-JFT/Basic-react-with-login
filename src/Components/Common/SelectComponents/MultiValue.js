import React, { useEffect, useState } from 'react';
import { components } from 'react-select';
import { Popover, PopoverBody } from 'reactstrap';

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 2;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} cropWithEllipsis style={{ float: 'left' }} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} name={props.selectProps.name} />
  ) : null;
};

const MoreSelectedBadge = ({ items, name }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const openPopover = () => setPopoverOpen(true);
  const closePopover = () => setPopoverOpen(false);

  const length = items ? items.length : 0;
  const label = `+ ${length} more`;

  return (
    <div className="moreBadgePopOver" style={{ float: 'right' }} onMouseEnter={openPopover} onMouseLeave={closePopover}>
      <div className="morePopOver" id={`morePopOver_${name}`}>
        {label}
      </div>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={`morePopOver_${name}`}
        toggle={toggle}
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
      >
        <PopoverBody className="popOverbody">
          {items.length ? (
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No items to display.</p>
          )}
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default MultiValue;
