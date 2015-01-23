(function($){
	
	var   PLUGIN_NAME = "quickClone"
		, HTML = [
					'<div class="qclone-instance" data-index="0">',
					'	<div class="qclone-content"/>',
					'	<div class="qclone-controls">',
					'		<div class="icon icon-minus" data-action="remove" title="Remove">-</div>',
					'		<div class="icon icon-plus" data-action="add" title="Add">+</div>',
					'	</div>',
					'</div>'
		  ]
		, CSS = [
				'.qclone-instance { position:relative; margin-bottom:10px; padding-right:60px;}',
				'.qclone-controls { width: 64px; position:absolute; top: 0; right:5px; }',
				'.qclone-controls .icon { display: inline-block; width:20px; height:20px; margin: 0 5px 0; cursor:pointer; text-align:center; background-color: #ddd; }'
		  ]
		;
			
	
	// add stylesheet for quickClone
	var el= document.createElement('style');
	el.type= "text/css";
	if(el.styleSheet) el.styleSheet.cssText= CSS.join("\n");//IE only
	else el.appendChild(document.createTextNode(CSS.join("\n")));
	document.getElementsByTagName('head')[0].appendChild(el);
		   
		   				  
	$.fn[PLUGIN_NAME] = function(method)
	{
		if (mp[method]) // map $('foo').myplugin('bar', 'baz') to mp.bar('baz')
		{
			return mp[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method)
		{
			return mp.init.apply(this, arguments); // if called without arguments, init
		}
		else
		{
			$.error('Method ' +  method + ' does not exist on $.'+mp.pluginName);
		}
	};

    var mp = {
	
		pluginName : PLUGIN_NAME,

        init : function(params) {
			params = params || {};
            return this.each(function()
            {
				if ( typeof $(this).data(PLUGIN_NAME) == "undefined" ) {
										
					$(this).data(PLUGIN_NAME, { 
									template: '<div class="qclone-content">'+$(this).html()+'</div>' ,
									html : [],
									afterAdd : function() { $.noop; },
									afterRemove : function() { $.noop; }
									});
					var data = $(this).data(PLUGIN_NAME);
					$.extend(data,params);
					
					$(this).addClass('qclone-wrapper').empty();
										
					// click Add
					$(this).on('click','div[data-action="add"]',function(e) { 
						var wrapper = $(e.target).closest('.qclone-wrapper')[0];
						add.call(wrapper);
					});
					
					// click Remove
					$(this).on('click','div[data-action="remove"]',function(e) { 
						var   $instance = $(e.target).closest('.qclone-instance')
							, wrapper = $instance.parent()[0]
							;
						$instance.remove();
						renumber.call(wrapper);
					});
					
					// create the first cloned instance
					add.call(this);
				}
            });
        },
		
		theEnd : null		
    };
		
	function renumber(isAdd) {
		isAdd = typeof isAdd == 'boolean' ? isAdd : false;  // true if called from add()
		var   i=0
			, count = $(this).find('>.qclone-instance').length
			, callback = isAdd ? 'afterAdd' : 'afterRemove'
			;
			
		$(this).find('>.qclone-instance').each(function() {
			var   index=i++
				, isFirst = index==0 ? true : false
				, isLast = (index+1)==count ? true : false
				;			
			$(this).attr('data-index',index);
						
			$(this).find('input, select, textarea').each(function() {
				var name = $(this).attr('name').replace(/{{n}}/, index.toString());
				$(this).attr('name',name);
			});
			
			$(this).find('.icon').show();
			if ( isFirst && isLast ) $(this).find('.icon.icon-minus').hide();
			if ( !isLast ) $(this).find('.icon.icon-plus').hide();
		});
		
		$(this).data(PLUGIN_NAME)[callback].call(this);
	}
	
	function add() {
		var   data = $(this).data(PLUGIN_NAME)
			, $instance = $(HTML.join("\n"))
			;
		$instance.find('>.qclone-content').replaceWith(data.template);
		
		$.each(data.html, function(attr,value) {
			if ( attr=='class' ) $instance.addClass(value);
			else $instance.attr(attr,value);
		});
		
		$instance.appendTo($(this));
		renumber.call(this,true);
	}
	
})(jQuery);
