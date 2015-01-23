# quickClone jQuery plugin

quickClone makes it easy to replicate parts of a form based on a user click.  For example, sometimes a form has the option to provide multiple instances of contact information.  Instead of writing a bunch of code to allow this, just use quickClone.

## Basic Idea

Below is part of a form that can be cloned by the user.  Let's call this a clone-template.  quickClone makes a copy of everything in the template and replaces the **{{n}}* with an index.

~~~.xml
<div class="address">
    <label>Address</label>
    <input type="text" name="Form[address][{{n}}][areacode]" size="20"/>
    
    <label>City</label>
    <input type="text" name="Form[city][{{n}}][exchange]" size="20"/>
    
    <label>State</label>
    <input type="text" name="Form[state][{{n}}][number]" size="2"/>
    
    <label>Zip</label>
    <input type="text" name="Form[state][{{n}}][number]" size="5"/>
</div>
~~~~

So, this clone-template is initialized with : `$('.address').quickClone()`

quickClone makes a template from the contents of the div and adds control buttons.


## Full example

To see a full example look at index.html.

## Html structure

For styling purposes, here is the html structure for quickClone objects.

~~~~.xml
<div class="qclone-wrapper">
	<div class="qclone-instance" data-index="0">
		<div class="qclone-content"></div>
		<div class="qclone-controls">
			<div class="icon icon-minus" data-action="remove" title="Remove">-</div>
			<div class="icon icon-plus" data-action="add" title="Add">+</div>
		</div>
	</div>
</div>
~~~~