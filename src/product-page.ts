$(document).ready(function () {
  // Hide out of stock message
  $('.product-out-of-stock').hide();

  // Remove any conditionally hidden form elements
  $('.w-condition-invisible').each(function () {
    $(this).remove();
  });

  // Set default quantity attributes
  $('input[name="quantity"]').attr('value', '1').attr('min', '1');

  // make the first option in the select act as a placeholder
  $('#variant-select option:first')
    .attr('hidden', 'true')
    .attr('selected', 'true')
    .attr('disabled', 'true');

  // *****************
  // start main script
  // *****************
  // we only have one variant option.

  // Set variant select drop-down options
  // from all the variants listed in the #variants div,
  // that have the class of ".variant"
  $('#variants .foxy_variant').each(function () {
    const variantName = $(this).find('.foxy_variant-name').text();
    const inventory = $(this).find('.foxy_variant-inventory').text();
    const variantPrice = $(this).find('.foxy_variant-price').text();
    //const image = $(this).find(".foxy_variant-image").attr("src");

    // disable the option if no stock
    const isDisabled = inventory > '0' ? '' : ' disabled';

    // add the option
    const optionHtml = `<option value="${variantName}" ${isDisabled}>${variantName} - ${variantPrice} Lei </option>`;
    $('#variant-select').append(optionHtml);
  });

  // Variant select trigger
  // update the hidden foxy form fields in the embed, when
  // the user makes a selection in the drop-down
  $('#variant-select').on('change', function () {
    const variantChosen = $('#variant-select').val();

    // hide/show "from price" text
    if (variantChosen === '') {
      $('#from-price').show();
    } else {
      $('#from-price').hide();
    }

    // go through all the variants, until we find
    // the one that generated that option
    $('#variants .foxy_variant').each(function () {
      // save the variant's data
      const variantName = $(this).find('.foxy_variant-name').text();
      const price = $(this).find('.foxy_variant-price').text() || '';
      const sku = $(this).find('.foxy_variant-sku').text();
      const weight = $(this).find('.foxy_variant-weight').text();
      const inventory = $(this).find('.foxy_variant-inventory').text();
      // const quantity = $('input[name="quantity"]').val();
      // var image = $(this).find(".foxy_variant-image").attr("src");
      // var images = $(this).find(".foxy_variant-images");

      // if we found the right variant that originated the selected option
      if (variantChosen === variantName) {
        $('#variant-input').val(variantChosen);
        $('input[name="price"]').val(price);
        $('input[name="code"]').val(sku);
        $('input[name="weight"]').val(weight);
        $('input[name="quantity_max"]').val(inventory);
        $('input[name="quantity"]').attr('max', inventory);

        // $('input[name="image"]').val(image); // set the cart image too, if the variant has a different image
        // $("#product-image").attr("src", image); // and also update the visible product image with the variant's image

        // calculate and display subtotal
        //var subtotal = (quantity * price).toFixed(2);
        // $("#product-price").text(subtotal); // for subtotal

        $('#product-price').text(price).addClass('highlight-yellow');
        window.setTimeout(function () {
          $('#product-price').removeClass('highlight-yellow');
        }, 1000);

        // update the images slider, if we have it
        // $(".w-slider .w-slide:not(:first)").remove();
        // $(images)
        //   .find("img")
        //   .each(function () {
        //     var imageSource = $(this).attr("src");
        //     $(".w-slider .w-slider-mask").append(
        //       '<div class="w-slide" style="transform: translateX(0px); opacity: 1;"><img src="' +
        //         imageSource +
        //         '"></div>'
        //     );
        //   });
      }
    });
  });
});
