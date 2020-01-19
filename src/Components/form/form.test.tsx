import React from 'react';
import {shallow} from 'enzyme';
import Form from './index';
import Input from '../inputs/index';



it('render form sucess ',()=>{
    shallow(<Form/>)
});
it('render input in form',()=>{
    const wrapper = shallow(
        <Form>
            <Input />
        </Form>
    );
    expect(wrapper.contains(<Input />)).toEqual(true);
})