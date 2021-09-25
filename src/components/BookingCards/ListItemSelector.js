import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch, useSelector } from "react-redux";
import { pushItem } from "../../redux/action/bookingActions";

const ListItemSelector = ({ onPushItem }) => {
  const [selectValues, setSelectedValues] = React.useState([]);
  const textField = React.useRef();
  const dispatch = useDispatch();
  const { allServices } = useSelector(
    (state) => state.booking
  );

  const handleAddItem = (selected) => {
    if (selected.length > 0) {
      const item = selected[0];
      onPushItem(item)
      setSelectedValues([]);
    };
  }

  return (
    <table class="table table-sm mb-0 ordertable">
      <tbody>
        <tr>
          {/*  <th scope="row">{index + 1}</th> */}
          <td>Add Service here : </td>
          <td>{/* {Curreny} {item.itemPrice} */}</td>
          <td>
            <React.Fragment>
              <Typeahead
                //   {...props}
                ref={textField}
                id="rendering-example"
                options={allServices || []}
                placeholder="Add Service By Name"
                labelKey="name"
                filterBy={["name"]}
                selected={selectValues}
                emptyLabel
                dropup={true}
                flip={true}
                onChange={(selected) => handleAddItem(selected)}
                //   autoFocus={true}
                selectHintOnEnter
                renderMenuItemChildren={(child) => <div>{child.name}</div>}
              //   renderInput={(data) => <input {...data} />}
              />
            </React.Fragment>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ListItemSelector;
