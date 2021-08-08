
//Shopping Cart Dropdown On Hover
(function(){
	  
    $('.shopping-cart').each(function() {
      var delay = $(this).index() * 50 + 'ms';
      $(this).css({
          '-webkit-transition-delay': delay,
          '-moz-transition-delay': delay,
          '-o-transition-delay': delay,
          'transition-delay': delay
      });
    });
    $('#cart, .shopping-cart').hover(function(e) {
      $(".shopping-cart").stop(true, true).addClass("active");
    }, function() {
      $(".shopping-cart").stop(true, true).removeClass("active");
    });  
  })();
  
//Show sizes
function myFunctionS() {
    document.getElementById("showsize").innerHTML = "S";
    var a = $('.addtocart').data('name'); //getter
    $('.addtocart').data("data-name","S"); //setter
    $("#button2").show()
    $("#button1").hide()
    $("#button3").hide()
    $("#button4").hide()
    }
function myFunctionM() {
    document.getElementById("showsize").innerHTML = "M";
    $("#button3").show()
    $("#button1").hide()
    $("#button2").hide()
    $("#button4").hide()
    }
function myFunctionL() {
    document.getElementById("showsize").innerHTML = "L";
    $("#button4").show()
    $("#button1").hide()
    $("#button2").hide()
    $("#button3").hide()
    }

// Error Message when clicking add to cart without size
function check() {

    var empt = document.getElementById('showsize').innerHTML;
    if (empt == null || empt == "")
    {
    alert("Please select a size.");
    return false;
    }
    else 
    {
    return true; 

    }

    }	

 // Shopping Cart 
    // =============================
    
    var shoppingCart = (function() {

        // Private methods and propeties
        // =============================
        cart = [];
        
        // Constructor
        function Item(name, count) {
          this.name = name;
          this.count = count;
        }
        
          // Save cart
          function saveCart() {
              sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
          }
  
      
   
        // Public methods and propeties
        // =============================
        var obj = {};
        
        // Add to cart
        obj.addItemToCart = function(name, count) {
          for(var item in cart) {
            if(cart[item].name === name) {
              cart[item].count ++;
              saveCart();
              return;
            }
          }
          var item = new Item(name, count);
          cart.push(item);
          saveCart();
        }
        // Set count from item
        obj.setCountForItem = function(name, count) {
          for(var i in cart) {
            if (cart[i].name === name) {
              cart[i].count = count;
              break;
            }
          }
        };
      
        // Count cart 
        obj.totalCount = function() {
          var totalCount = 0;
          for(var item in cart) {
            totalCount += cart[item].count;
          }
          return totalCount;
        }
      
        // Total cart
        obj.totalCart = function() {
          var totalCart = 0;
          for(var item in cart) {
            totalCart += cart[item].count;
          }
          return Number(totalCart.toFixed(2));
        }
      
        // List cart
        obj.listCart = function() {
          var cartCopy = [];
          for(i in cart) {
            item = cart[i];
            itemCopy = {};
            for(p in item) {
              itemCopy[p] = item[p];
      
            }
            itemCopy.total = Number(item.count).toFixed(2);
            cartCopy.push(itemCopy)
          }
          return cartCopy;
        }
   
        return obj;
      })();
      
  
      // Triggers / Events
      // ***************************************** 
      // Add item
      $('.addtocart').click(function(event) {
        event.preventDefault();
        var name = $(this).data('name');
        shoppingCart.addItemToCart(name, 1);
        displayCart();
      });
      
     
      
  
      function displayCart() {
        var cartArray = shoppingCart.listCart();
        var output = "";
        for(var i in cartArray) {
          output += "<ul class='shopping-cart-items'>"
            + "<li class='clearfix'> <img src='assets/images/classic-tee.jpg'  /> <p class='font-weight-semi-bold text-main'>Classic Tee</p>" 
            + "<p class='text-main'> "  + cartArray[i].count + " x <b>$75.00</b></p> <p class='text-main'>Size: " + cartArray[i].name + "</li> </ul>";
        }
        $('.shopping-cart').html(output);
        $('.total-cart').html(shoppingCart.totalCart());
        $('.total-count').html(shoppingCart.totalCount());
      }
      
   
      
      // Item count input
      $('.shopping-cart').on("change", ".item-count", function(event) {
         var name = $(this).data('name');
         var count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
      });
      
      displayCart();