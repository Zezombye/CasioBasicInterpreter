##HEADER##
/*
	Default template driver for JS/CC generated parsers running as
	browser-based JavaScript/ECMAScript applications.
	
	WARNING: 	This parser template will not run as console and has lesser
				features for debugging than the console derivates for the
				various JavaScript platforms.
	
	Features:
	- Parser trace messages
	- Integrated panic-mode error recovery
	
	Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
	
	This is in the public domain.
*/

var ##PREFIX##_dbg_withtrace		= false;
var ##PREFIX##_dbg_string			= new String();

function __##PREFIX##dbg_print( text )
{
	##PREFIX##_dbg_string += text + "\n";
}

function __##PREFIX##lex( info )
{
	var state		= 0;
	var match		= -1;
	var match_pos	= 0;
	var start		= 0;
	var pos			= info.offset + 1;

	do
	{
		pos--;
		state = 0;
		match = -2;
		start = pos;

		if( info.src.length <= start )
			return ##EOF##;

		do
		{

##DFA##
			pos++;

		}
		while( state > -1 );

	}
	while( ##WHITESPACE## > -1 && match == ##WHITESPACE## );

	if( match > -1 )
	{
		info.att = info.src.substr( start, match_pos - start );
		info.offset = match_pos;
		
##TERMINAL_ACTIONS##
	}
	else
	{
		info.att = new String();
		match = -1;
	}

	return match;
}


function __##PREFIX##parse( src, err_off, err_la, prgNodes, prgLabels )
{
	var		sstack			= new Array();
	var		vstack			= new Array();
	var 	err_cnt			= 0;
	var		act;
	var		go;
	var		la;
	var		rval;
	var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
	var		info			= new parseinfo();
	
##TABLES##

##LABELS##
	
	info.offset = 0;
	info.src = src;
	info.att = new String();
	
	if( !err_off )
		err_off	= new Array();
	if( !err_la )
	err_la = new Array();
	
	sstack.push( 0 );
	vstack.push( 0 );
	
	la = __##PREFIX##lex( info );

	while( true )
	{
		act = ##ERROR##;
		for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
		{
			if( act_tab[sstack[sstack.length-1]][i] == la )
			{
				act = act_tab[sstack[sstack.length-1]][i+1];
				break;
			}
		}

		if( ##PREFIX##_dbg_withtrace && sstack.length > 0 )
		{
			__##PREFIX##dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
							"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
							"\tAction: " + act + "\n" + 
							"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
									"..." : "" ) + "\"\n" +
							"\tStack: " + sstack.join() + "\n" +
							"\tValue stack: " + vstack.join() + "\n" );
		}
		
			
		//Panic-mode: Try recovery when parse-error occurs!
		if( act == ##ERROR## )
		{
			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
			
			err_cnt++;
			err_off.push( info.offset - info.att.length );			
			err_la.push( new Array() );
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
				err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
			
			//Remember the original stack!
			var rsstack = new Array();
			var rvstack = new Array();
			for( var i = 0; i < sstack.length; i++ )
			{
				rsstack[i] = sstack[i];
				rvstack[i] = vstack[i];
			}
			
			while( act == ##ERROR## && la != ##EOF## )
			{
				if( ##PREFIX##_dbg_withtrace )
					__##PREFIX##dbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == ##ERROR## && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = ##ERROR##;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != ##ERROR## )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __##PREFIX##lex( info );
			}
			
			if( act == ##ERROR## )
			{
				if( ##PREFIX##_dbg_withtrace )
					__##PREFIX##dbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == ##ERROR## )
			break;
		*/
		
		
		//Shift
		if( act > 0 )
		{			
			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
		
			sstack.push( act );
			vstack.push( info.att );
			
			la = __##PREFIX##lex( info );
			
			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
		}
		//Reduce
		else
		{		
			act *= -1;
			
			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "Reducing by producution: " + act );
			
			rval = void(0);
			
			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "\tPerforming semantic action..." );
			
##ACTIONS##

			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
				
			for( var i = 0; i < pop_tab[act][1]; i++ )
			{
				sstack.pop();
				vstack.pop();
			}
									
			go = -1;
			for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
				{
					go = goto_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}
			
			if( act == 0 )
				break;
				
			if( ##PREFIX##_dbg_withtrace )
				__##PREFIX##dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
				
			sstack.push( go );
			vstack.push( rval );			
		}
		
		if( ##PREFIX##_dbg_withtrace )
		{		
			alert( ##PREFIX##_dbg_string );
			##PREFIX##_dbg_string = new String();
		}
	}

	if( ##PREFIX##_dbg_withtrace )
	{
		__##PREFIX##dbg_print( "\nParse complete." );
		alert( ##PREFIX##_dbg_string );
	}
	
	return err_cnt;
}


##FOOTER##
