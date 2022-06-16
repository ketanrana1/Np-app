import React from 'react'

const AddFlow = () => {
  return (
    <div>
      <h1 className="page-head">Add Flow</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
        <form> 

        <div className="row">
          <div className="form-group col-12">
              <div className="label-input-cont">
              <p>Flow Name</p>
              <input type="text" className="form-control all-form-fl-w-ip" placeholder="Flow Name"/>
            </div>
          </div>
          
          <div className="form-group col-12">
              <div className="label-input-cont">
              <p>Description</p>
              <input type="text" className="form-control all-form-fl-w-ip" placeholder="Description here..."/>
            </div>
          </div>

          <div className="form-group col-12">
              <div className="label-input-cont">
              <p>Task</p>
              <select name="task" class="form-control all-form-fl-w-ip" >
                <option value="task">Task</option>
                <option value="task">Task</option>
                <option value="task">Task</option>
              </select>
            </div>
          </div>

          <div className="form-group col-12">
              <div className="label-input-cont">
              <p>VariableSel</p>
              <select name="VariableSel" class="form-control all-form-fl-w-ip" >
                <option value="VariableSel">VariableSel</option>
                <option value="VariableSel">VariableSel</option>
                <option value="VariableSel">VariableSel</option>
              </select>
            </div>
          </div>
        </div>
        <div className="submit-cont">
          <input type="submit" value="Save" />
        </div>
      </form>
        </div>
      </div>
    </div>
  ) 
}
 export default AddFlow