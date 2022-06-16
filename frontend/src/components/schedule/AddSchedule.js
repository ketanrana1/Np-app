import React from 'react'

const AddSchedule = () => {
  return (
    <div>
      <h1 className="page-head">Add Schedule</h1>
      <div className="inner-body-cont">
        <div className="flow-form-cont cont-form-all">
        <form>

        <div className="row">
          <div className="form-group col-12">
              <div className="label-input-cont">
              <p>Name</p>
              <input type="text" className="form-control all-form-fl-w-ip" placeholder="Name"/>
            </div>
          </div>
          
          <div className="form-group col-12">
              <div className="label-input-cont">
              <p>Description</p>
              <input type="text" className="form-control all-form-fl-w-ip" placeholder="Description"/>
            </div>
          </div>

          <div className="form-group col-12">
              <div className="label-input-cont">
              <p>Flow</p>
              <select name="task" class="form-control all-form-fl-w-ip" >
                <option value="task">Flow</option>
                <option value="task">Flow</option>
                <option value="task">Flow</option>
              </select>
            </div>
          </div>

          <div className="dropdown-response-cont col-12">
              <div className="row">

                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>CronPattern</p>
                    <input type="text" className="form-control all-form-fl-w-ip" placeholder="CronPattern"/>
                  </div>
                </div>

                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Error Email</p>
                    <input type="text" className="form-control all-form-fl-w-ip" placeholder="Email id"/>
                  </div>
                </div>

                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Success Email</p>
                    <input type="text" className="form-control all-form-fl-w-ip" placeholder="Success Email"/>
                  </div>
                </div>

                <div className="form-group col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>CronPattern</p>
                    <input type="text" className="form-control all-form-fl-w-ip" placeholder="CronPattern"/>
                  </div>
                </div>
                
                <div className="form-check col-12 col-md-6">
                  <div className="label-input-cont">
                    <p>Active Flag</p>
                    <div className="all-form-fl-w-ip chk-bx">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">Active</label>
                    </div>
                  </div>
                </div>


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

export default AddSchedule
