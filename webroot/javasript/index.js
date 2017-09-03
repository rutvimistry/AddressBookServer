 // JavaScript Document
var $tabcontent = $('.tabcontent'); /*global declaration of left navigation tab content */
var $form = $('.f1');
var $addcontact = $('.tablinks');
var $delete = $('.del');
var $givenName = $('.givenName');
var $surname = $('.surname');
var $phonetype = $('.phone-types');
var $addresstype = $('.address-types');
var $phone = $('.phone');
var $address = $('.address');
var $city = $('.city');
var $state = $('.state');
var $zip = $('.zip');
var $phonetypes = $('.phonetypes')
var $addresstypes = $('.address-types');
var $phoneID = '';
var $addressID = '';

/* function when user click to see contact details*/
function openContent(evt, contactID) 
{
		var $tabcontent = $('.tabcontent');
		var $edit = $('.edit');
		$edit.show();
		var $givenName, $surname;
		$tabcontent.empty(); 
	
		//initially its empty we can keep default by using document.("#content").setdefault();
		
		/*when left navigation name and surname is clicked it display name and surname to right side*/
		$.ajax({
		type: 'GET',
		cache:'false',
		url: '/contacts/'+contactID,
		cache: 'false',
		success: function(tabcontent){
			$.each(tabcontent,function(i,link) 
				{
				$tabcontent.append('<input type="image" onClick="edit('+contactID+');" src="images/edit-record.png" height="30px" width="30px" style="margin-top: 20px ">');
			   
				$tabcontent.append('<table class="displayname" align="center" style="margin-right: 60px;"><tr><td>Name  </td><td>'+tabcontent.givenName+'</td></tr><tr><td> Surname  </td><td>'+tabcontent.surname+'</td></tr></table>').insertAfter("img class=''");
			   });
		}

		});
		
		//to display phone number of particular contactid
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/phones',
		cache: 'false',
			dataType:'json',
		
		success: function(phonenumber){
			
		$.each(phonenumber,function(i,contacts) {			  
				  $tabcontent.append('<table class="displayphone" align="center" style="margin-top: 0px; margin-right: 60px;"><tr><td>'+contacts.phoneType+'</td><td> '+contacts.phoneNumber+'</td></tr></table>');
					
		});
		
		}

		});
		
	/*get particular contact address*/
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/addresses',
		cache: 'false',
		dataType:'json',
		
		success: function(address){
			
		$.each(address,function(i,addresses)
		{			  
			$tabcontent.append('<table class="displayaddress" align="center" style="margin-top: 0px; margin-right: 60px;"><tr><td>'+addresses.addressType+' </td><td> '+addresses.street+'</td></tr></table>');
			 
			$tabcontent.append('<table class="displayaddress" align="center" style="margin-top: 0px; margin-right: 60px;"><tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td> '+addresses.city+' '+addresses.state+' '+addresses.postalCode+'</td></tr></table>');
					
		});
		
		}

		});
		
}

/*update the data to database*/
function edit(contactID)
{
		$delete.show();
		
		$tabcontent.empty(); //initially its empty we can keep default by using document.("#content").setdefault();
		$tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.jpg" height="30px" width="30px" onclick="javascript:deletecontact('+contactID+');">');
	
		$.ajax({
		type: 'GET',
		cache:'false',
		url: '/contacts/'+contactID,
		success: function(tabcontent){
				$tabcontent.append('<tr><td>Name</td><td><input size="50" height="50px" type="text" class="givenName" name="givenName" value="'+tabcontent.givenName+'"></td></tr><tr><td>Surname</td><td><input size="50" type="text" class="surname" name="surname" value="'+tabcontent.surname+'"></td></tr>');	
		}	
		});
	
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/phones',
		cache: 'false',
		dataType:'json',
		
		success: function(phonenumber){
			
		$.each(phonenumber,function(i,contacts) {			  
				  $tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.png" height="20px" width="20px" onclick="javascript:deletePhoneID('+contactID+','+contacts.phoneID+')">&nbsp; &nbsp;Delete Phone');
				
							$phoneID = contacts.phoneID;

				  $tabcontent.append('<table class="panel"><tr><td>Phone Number</td><td></td></tr><tr><td><select class="phone-types" name="phone-types"><option class="phonetypes" name="phonetypes" value="'+contacts.phoneType+'">'+contacts.phoneType+'</option></select></td><td><input size="15" type="text" class="phone" name="phone" value="'+contacts.phoneNumber+'"></td></tr></table>');	
				});
			
		}

		});
		
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/addresses',
		cache: 'false',
		dataType:'json',
		
		success: function(address){
			
		$.each(address,function(i,addresses)
		{			  
			$tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.png" height="20px" width="20px" onclick="javascript:deleteAddressID('+contactID+','+addresses.addressID+')">&nbsp; &nbsp;Delete Address');
			
			$addressID = addresses.addressID;
			$tabcontent.append('<table><tr><td>Address</td><td></td></tr><tr><td><input type="hidden" name="addressID" value="'+addresses.addressID+'" ><select class="address-types" name="address-type"><option class="addresstypes" value="'+addresses.addressType+'">'+addresses.addressType+'</option></select></td><td><input size="15" type="text" class="address" name="address" value="'+addresses.street+'"></td></tr><tr><td></td><td><input size="15" type="text" class="city" name="city" value="'+addresses.city+'"></td></tr><tr><td><input size="15" type="text" class="state" name="state" value="'+addresses.state+'"></td><td><input size="15" type="text" class="zip" name="zip" value="'+addresses.postalCode+'"></td></tr></table>');			
		});
			$tabcontent.append('<center><button class="button button1" onclick="javascript:updateContact('+contactID+','+$phoneID+','+$addressID+')" id="update-contact">Update!</button></center>');		
		}
			
		});
					

}


function deletePhoneID(contactID,phoneID)
{
	$.ajax({
		type: 'DELETE',
		url: ' /contacts/'+contactID+'/phones/'+phoneID,
		data: JSON.stringify({
    	phoneType: $phonetypes.val(),
		phoneNumber: $phone.val(),
//		phone: $phone.val(),
//		address: $address.val(),
		  }),
		  error: function(e) {
			console.log(e);
		  },
		contentType: "application/json; charset=utf-8",
        dataType: "json",
		success: function(deletephoneid)
		{
			//$tabcontent.append('confirm("Are you sure you want to submit?");"');
			console.log("deletephoneid");
			console.log(deletephoneid);
			console.log(deletephoneid.phoneType);
			console.log(deletephoneid.phoneNumber);
			
		}
	});
	 
		$delete.show();
		
		$tabcontent.empty(); //initially its empty we can keep default by using document.("#content").setdefault();
		$tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.jpg" height="30px" width="30px" onclick="javascript:deletecontact('+contactID+');">');
	
		$.ajax({
		type: 'GET',
		cache:'false',
		url: '/contacts/'+contactID,
		success: function(tabcontent){
				$tabcontent.append('<tr><td>Name</td><td><input size="50" height="50px" type="text" class="givenName" name="givenName" value="'+tabcontent.givenName+'"></td></tr><tr><td>Surname</td><td><input size="50" type="text" class="surname" name="surname" value="'+tabcontent.surname+'"></td></tr>');	
		}	
		});
	
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/phones',
		cache: 'false',
		dataType:'json',
		
		success: function(phonenumber){
			
		$.each(phonenumber,function(i,contacts) {			  
				  $tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.png" height="20px" width="20px" onclick="javascript:deletePhoneID('+contactID+','+contacts.phoneID+')">&nbsp; &nbsp;Delete Phone');
				
							$phoneID = contacts.phoneID;

				  $tabcontent.append('<table class="panel"><tr><td>Phone Number</td><td></td></tr><tr><td><select class="phone-types" name="phone-types"><option class="phonetypes" name="phonetypes" value="'+contacts.phoneType+'">'+contacts.phoneType+'</option></select></td><td><input size="15" type="text" class="phone" name="phone" value="'+contacts.phoneNumber+'"></td></tr></table>');	
				});
			
		}

		});
		
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/addresses',
		cache: 'false',
		dataType:'json',
		
		success: function(address){
			
		$.each(address,function(i,addresses)
		{			  
			$tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.png" height="20px" width="20px" onclick="javascript:deleteAddressID('+contactID+','+addresses.addressID+')">&nbsp; &nbsp;Delete Address');
			
			$addressID = addresses.addressID;
			$tabcontent.append('<table><tr><td>Address</td><td></td></tr><tr><td><input type="hidden" name="addressID" value="'+addresses.addressID+'" ><select class="address-types" name="address-type"><option class="addresstypes" value="'+addresses.addressType+'">'+addresses.addressType+'</option></select></td><td><input size="15" type="text" class="address" name="address" value="'+addresses.street+'"></td></tr><tr><td></td><td><input size="15" type="text" class="city" name="city" value="'+addresses.city+'"></td></tr><tr><td><input size="15" type="text" class="state" name="state" value="'+addresses.state+'"></td><td><input size="15" type="text" class="zip" name="zip" value="'+addresses.postalCode+'"></td></tr></table>');			
		});
			$tabcontent.append('<center><button class="button button1" onclick="javascript:updateContact('+contactID+','+$phoneID+','+$addressID+')" id="update-contact">Update!</button></center>');		
		}
			
		});
	
	
}

function deleteAddressID(contactID,addressID)
{
	var $addresstype =$('.addresstypes');
	var $street= $('.address');
	var $city = $('.city');
	var $state = $('state');
	var $zip = $('.zip');
	
	$.ajax({
		type: 'DELETE',
		url: ' /contacts/'+contactID+'/addresses/'+addressID,
		data: JSON.stringify({
    	addressType: $addresstype.val(),
		street: $street.val(),
		city: $city.val(),
		state: $state.val(),
		postalCode: $zip.val(),

//		phone: $phone.val(),
//		address: $address.val(),
		  }),
		  error: function(e) {
			console.log(e);
		  },
		contentType: "application/json; charset=utf-8",
        dataType: "json",
		success: function(deletephoneid)
		{
			//$tabcontent.append('confirm("Are you sure you want to submit?");"');
			console.log("deletephoneid");
			console.log(deletephoneid);
			console.log(deletephoneid.addressType);
			console.log(deletephoneid.street);
			
		}
	});
	 
		$delete.show();
		
		$tabcontent.empty(); //initially its empty we can keep default by using document.("#content").setdefault();
		$tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.jpg" height="30px" width="30px" onclick="javascript:deletecontact('+contactID+');">');
	
		$.ajax({
		type: 'GET',
		cache:'false',
		url: '/contacts/'+contactID,
		success: function(tabcontent){
				$tabcontent.append('<tr><td>Name</td><td><input size="50" height="50px" type="text" class="givenName" name="givenName" value="'+tabcontent.givenName+'"></td></tr><tr><td>Surname</td><td><input size="50" type="text" class="surname" name="surname" value="'+tabcontent.surname+'"></td></tr>');	
		}	
		});
	
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/phones',
		cache: 'false',
		dataType:'json',
		
		success: function(phonenumber){
			
		$.each(phonenumber,function(i,contacts) {			  
				  $tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.png" height="20px" width="20px" onclick="javascript:deletePhoneID('+contactID+','+contacts.phoneID+')">&nbsp; &nbsp;Delete Phone');
				
							$phoneID = contacts.phoneID;

				  $tabcontent.append('<table class="panel"><tr><td>Phone Number</td><td></td></tr><tr><td><select class="phone-types" name="phone-types"><option class="phonetypes" name="phonetypes" value="'+contacts.phoneType+'">'+contacts.phoneType+'</option></select></td><td><input size="15" type="text" class="phone" name="phone" value="'+contacts.phoneNumber+'"></td></tr></table>');	
				});
			
		}

		});
		
		$.ajax({
		type: 'GET',
		//cache:'false',
		url: '/contacts/'+contactID+'/addresses',
		cache: 'false',
		dataType:'json',
		
		success: function(address){
			
		$.each(address,function(i,addresses)
		{			  
			$tabcontent.append('<input type="image" name="delete" style="margin-top: 20px;" src="images/remove-record.png" height="20px" width="20px" onclick="javascript:deleteAddressID('+contactID+','+addresses.addressID+')">&nbsp; &nbsp;Delete Address');
			
			$addressID = addresses.addressID;
			$tabcontent.append('<table><tr><td>Address</td><td></td></tr><tr><td><input type="hidden" name="addressID" value="'+addresses.addressID+'" ><select class="address-types" name="address-type"><option class="addresstypes" value="'+addresses.addressType+'">'+addresses.addressType+'</option></select></td><td><input size="15" type="text" class="address" name="address" value="'+addresses.street+'"></td></tr><tr><td></td><td><input size="15" type="text" class="city" name="city" value="'+addresses.city+'"></td></tr><tr><td><input size="15" type="text" class="state" name="state" value="'+addresses.state+'"></td><td><input size="15" type="text" class="zip" name="zip" value="'+addresses.postalCode+'"></td></tr></table>');			
		});
			$tabcontent.append('<center><button class="button button1" onclick="javascript:updateContact('+contactID+','+$phoneID+','+$addressID+')" id="update-contact">Update!</button></center>');		
		}
			
		});
	
	
}


function updateContact(contactID,phoneID, addressID){
"use strict";
	var $givenName = $('.givenName');
	var $surname = $('.surname');
	var $phonetypes = $('.phonetypes');
	var $phone = $('.phone');
	var $addresstype =$('.addresstypes');
	var $street= $('.address');
	var $city = $('.city');
	var $state = $('state');
	var $zip = $('.zip');
	
	$.ajax({
		type: 'PUT',
		url: ' /contacts/'+contactID,
		data: JSON.stringify({
    	givenName: $givenName.val(),
		surname: $surname.val(),
		  }),
		
		  error: function(e) {
			console.log(e);
		  },
		contentType: "application/json; charset=utf-8",
        dataType: "json",
		success: function(updatecontact)
		{
			console.log('update phone number of id');
			console.log($givenName.val() + ' ' + $surname.val());
		}
	});
	
	$.ajax({
		type: 'PUT',
		url: ' /contacts/'+contactID+'/phones/'+phoneID,
		data: JSON.stringify({
		phoneType: $phonetypes.val(),
		phoneNumber: $phone.val(),
		  }),
		  error: function(e) {
			console.log(e);
			  		console.log('update phone number of id '+phoneID+ ' '+$phonetypes.val()+ ' '+ $phone.val());

		  },
		contentType: "application/json; charset=utf-8",
        dataType: "json",
			
		success: function(updatecontact)
		{
			console.log('update phone number of id');
			console.log(phoneID);
		}
	});
	
	$.ajax({
		type: 'PUT',
		url: ' /contacts/'+contactID+'/addresses/'+addressID,
		data: JSON.stringify({
		addressType: $addresstype.val(),
		street: $street.val(),
		city: $city.val(),
		state: $state.val(),
		postalCode: $zip.val(),

		}),
		  error: function(e) {
			console.log(e);
			  		console.log('update phone number of id '+addressID+ ' '+$addresstype.val()+ ' '+ $street.val());

		  },
		contentType: "application/json; charset=utf-8",
        dataType: "json",
			
		success: function(updateaddress)
		{
			console.log('update phone number of id');
			console.log(phoneID);
		}
	});
	
	location.reload();
}

//update particular phoneid


//update operation ends

function deletecontact(contactID){
	"use strict";
	
	$.ajax({
		type: 'DELETE',
		url: ' /contacts/'+contactID,
		data: JSON.stringify({
    	givenName: $givenName.val(),
		surname: $surname.val(),
//		phone: $phone.val(),
//		address: $address.val(),
		  }),
		  error: function(e) {
			console.log(e);
		  },
		contentType: "application/json; charset=utf-8",
        dataType: "json",
		success: function(newcontact)
		{
			console.log("newcontact");
			console.log(newcontact);
			console.log(newcontact.givenName);
			console.log(newcontact.surname);
			
		}
	});
				
	location.reload();
}
	
	
					  
/*main Javascript*/
$(function(){
	"use strict";
	var $contacts = $('#contacts');
	var $tab = $('.tab');
	//var $hello = "hellp";
	
	//$tabletest.append('<tr><td>{{$hello}}</td><td>world</td></tr>');

/* get all contacts on left panel */
	$.ajax({
	type: 'GET',
	url: '/contacts',
	success: function(tab){
//		$tab.append('  <button class="tablinks" value="Add New Contact"><input type="image" src="images/add-record.png" /> &nbsp;&nbsp;&nbsp;Add New Contact</button>');
		$.each(tab,function(i,link) {
			
			   $tab.append('<button  class="tablinks" onclick="javascript:openContent(event, '+link.contactID+')" name="b1">'+link.givenName+' '+link.surname+'</button>');
			   });
	}

	});

/*when click add it will add to database via api*/
$addcontact.on('click', function(){
	var $phonetypes = $('.phone-types')
	var $addresstypes = $('.address-types');
	
	$form.show();
		
		$.ajax({
		type: 'GET',
		cache:'false',
		url: '/phone-types',
		dataType:'json',
		success: function(phonenumber){
			//$tabcontent.append('<tr><td><select name="phone-types">');
		var types = phonenumber;
		$.each(phonenumber,function(i,contacts) {
			 $phonetypes.append($('<option class="phonetypes"></option>')
                    .attr("value",types[i])
                    .text(types[i])); 
		});
		}
	});	
			
		$.ajax({
		type: 'GET',
		cache:'false',
		url: '/address-types',
		dataType:'json',
		success: function(address){
			//$tabcontent.append('<tr><td><select name="phone-types">');
		var types = address;
		$.each(address,function(i,contacts) {
			 $addresstypes.append($('<option class="addresstypes"></option>')
                    .attr("value",types[i])
                    .text(types[i])); 
		});
		}
	});
	
	
	});
	

/*add contact ends*/	
	
/* posting contact to server */

	$('#add-contact').on('click', function(){
	
	$.ajax({
		type: 'POST',
		url: ' /contacts',
		data: JSON.stringify({
    	givenName: $givenName.val(),
		surname: $surname.val(),
//		phone: $phone.val(),
//		address: $address.val(),
		  }),
		  error: function(e) {
			console.log(e);
		  },
		contentType: "application/json; charset=utf-8",
        dataType: "json",
		success: function(newcontact)
		{
			console.log("newcontact");
			console.log(newcontact);
			console.log(newcontact.givenName);
			console.log(newcontact.surname);
			$contacts.append('<button  class="tablinks" onclick="openContent(event, '+newcontact.contactID+')" name="b1">{{givenName}} {{surname}}</button>');
			
			addphone(newcontact.contactID);
			
			addaddress(newcontact.contactID);
		}
	});
		
		function addphone(contactID)
		{
			$.ajax({
				type: 'POST',
				url: ' /contacts/'+contactID+'/phones',
				data: JSON.stringify({
				phoneType: $phonetype.val(),
				phoneNumber: $phone.val(),
		//		address: $address.val(),
				  }),
				  error: function(e) {
					console.log(e);
				  },

				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(newphone)
				{
					console.log('entered number');
				}
				});
			
		}
		
		function addaddress(contactID)
		{
				$.ajax({
				type: 'POST',
				url: ' /contacts/'+contactID+'/addresses	',
				data: JSON.stringify({
				//phone: $phone.val(),
				addressType : $addresstype.val(),
				 street : $address.val(),
				 city : $city.val(),
				state : $state.val(),
				postalCode : $zip.val(),
				  }),
				  error: function(e) {
					console.log(e);
				  },
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(newaddress)
				{
					console.log('{{addressType}}  {{street}}  {{city}}  {{state}} {{zip}}');
					console.log('entered address');
				}
				});
		}
	location.reload();	
});	
	
/*last tag*/	
});	