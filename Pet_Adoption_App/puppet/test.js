const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    try{
      // await page.goto('https://api.example.com/');
      await page.goto('https://8081-fcebdccccd313955453ebabbcadeeefceacone.premiumproject.examly.io/');
      await page.setViewport({
        width:1200,
        height:1200,
      })
        
      const headers = await page.evaluate(() => {
        const thElements = Array.from(document.querySelectorAll('table th'));
        return thElements.map(th => th.textContent.trim());
      });
    // console.log(headers);
      if (headers[0] === 'Name' && headers[1] === 'Type' && headers[2] === 'Age' && headers[3] ==='Availability'){
        const rowCount = await page.$$eval('table tbody tr', rows => rows.length);
    // console.log(rowCount);
        if (rowCount > 0) {      
          await page.waitForSelector('table tbody tr', { timeout: 5000 } );
          console.log('TESTCASE:In_Index_Page_Table_Headers_and_Rows_are_Correct_and_Exists:success');
        }else{          
          console.log('TESTCASE:In_Index_Page_Table_Headers_and_Rows_are_Correct_and_Exists:failure');
        }
      }else{
        console.log('TESTCASE:In_Index_Page_Table_Headers_and_Rows_are_Correct_and_Exists:failure');
      }
    }
    catch(e){
      console.log('TESTCASE:In_Index_Page_Table_Headers_and_Rows_are_Correct_and_Exists:failure');
    }

    const page2 = await browser.newPage();
    try {
      await page2.goto('https://8081-fcebdccccd313955453ebabbcadeeefceacone.premiumproject.examly.io/');
      await page2.setViewport({
        width: 1200,
        height: 1200,
      });
      await page2.waitForSelector('#adopt', { timeout: 2000 });
      await page2.click('#adopt');
      const urlAfterClick = page2.url();
      await page2.waitForSelector('#adopterName', { timeout: 2000 });
      await page2.waitForSelector('#adopterEmail', { timeout: 2000 });
      await page2.waitForSelector('#adopterPhone', { timeout: 2000 });
      await page2.waitForSelector('#adopterAddress ', { timeout: 2000 });
      const Message = await page2.$eval('h1', element => element.textContent.toLowerCase());
      // console.log("Message",Message);
    if(Message.includes("adopt a pet")&&urlAfterClick.toLowerCase().includes('/petadoption/petadopter'))
    {
    console.log('TESTCASE:Check_Successful_Navigation_to_PetAdopter_Page_and_Presence_of_Name_Email_Phone_Address_Elements:success');
    }    
    else{
    console.log('TESTCASE:Check_Successful_Navigation_to_PetAdopter_Page_and_Presence_of_Name_Email_Phone_Address_Elements:failure');
    }
    } catch (e) {
      console.log('TESTCASE:Check_Successful_Navigation_to_PetAdopter_Page_and_Presence_of_Name_Email_Phone_Address_Elements:failure');
    } 


  const page3 = await browser.newPage();

    try {        
      await page3.goto('https://8081-fcebdccccd313955453ebabbcadeeefceacone.premiumproject.examly.io/');
      await page3.setViewport({
        width: 1200,
        height: 800,
      });

      await page3.waitForSelector('#delete', { timeout: 2000 });
      await page3.click('#delete');
      const urlAfterClick = page3.url();  
      await page3.waitForSelector('h1', { timeout: 5000 });
      await page3.waitForSelector('#delete', { timeout: 2000 });
      await page3.waitForSelector('#cancel', { timeout: 2000 });
      const Message1 = await page3.$eval('h1', element => element.textContent.toLowerCase());
      // console.log("Message", Message1);
    if(Message1.includes("delete pet") && urlAfterClick.toLowerCase().includes('/pet/delete'))
    {
    console.log('TESTCASE:Check_Successful_Navigation_to_Pet_Deleting_Page_and_Presence_of_h1_delete_cancel_Elements:success');
    }    
    else{
    console.log('TESTCASE:Check_Successful_Navigation_to_Pet_Deleting_Page_and_Presence_of_h1_delete_cancel_Elements:failure');
    }

    }
  catch(e){
    console.log('TESTCASE:Check_Successful_Navigation_to_Pet_Deleting_Page_and_Presence_of_h1_delete_cancel_Elements:failure');
  }
  
  finally{
    await page.close();
    await page2.close();
    await page3.close();
    await browser.close();
  }
  
})();