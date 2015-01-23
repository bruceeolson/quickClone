# quickClone jQuery plugin

quickClone makes it easy to replicate parts of a form based on a user click.  For example, sometimes a form has the option to provide multiple instances of contact information.  Instead of writing a bunch of code to allow this, just use quickClone.

## Basic Idea

Below is the address section of a form that can be cloned by the user if the user wants to supply multiple addresses.  Let's call this a **clone-template**.  quickClone makes a copy of everything in the template and replaces the **{{n}}* with an index number for each instance that is cloned.

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

To initialize the clone-template above use : `$('.address').quickClone()`

quickClone makes a template from the contents of the div and absolutely positions the add/remove control buttons.


## Full example

To see a full example look at index.html.

## Initialization options

quickClone accepts a configuration object with the following properties.  All of them are optional.

property  |  type | notes
----------|-------|--------
afterAdd | function | this function is run after a clone instance is added ( **this** references the qclone-wrapper DOM element )
afterRemove | function | this function is run after a clone instance is removed
html | object | {style: "margin: 0 0 10px;", class:"aClass bClass"}  adds html attributes to the .qclone-instance container


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