document.addEventListener('DOMContentLoaded', (event) => {
    const shareButton = document.getElementById('shareButton');
    const shareFileButton = document.getElementById('shareFileButton');
    const shareWhatsAppButton = document.getElementById('shareWhatsAppButton');
    const fileInput = document.getElementById('fileInput');

    // Check if the Web Share API is supported
    if (navigator.share && navigator.canShare) {
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Web Share API Demo',
                    text: 'Check out this awesome content!',
                    url: 'https://example.com'
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        });

        shareFileButton.addEventListener('click', async () => {
            const file = fileInput.files[0];
            debugger;
            console.log(fileInput.files[0]);
            if (file) {
                if (navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'Web Share API Demo',
                            text: 'Here is a file for you!',
                        });
                        console.log('File shared successfully');
                    } catch (error) {
                        console.error('Error sharing file:', error);
                    }
                } else {
                    console.warn('Sharing files is not supported.');
                }
            } else {
                alert('Please select a file to share.');
            }
        });
    } else {
        shareButton.style.display = 'none';
        shareFileButton.style.display = 'none';
        alert('Web Share API is not supported in your browser.');
    }

    // WhatsApp sharing
    shareWhatsAppButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileData = e.target.result;
                const blob = new Blob([fileData], { type: file.type });
                const url = URL.createObjectURL(blob);
                
                // Create a temporary link to download the file
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = file.name;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                // Create a WhatsApp URL with a message
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent('Please check out this file I am sharing: ' + url)}`;
                window.open(whatsappUrl, '_blank');

                // Inform the user to manually share the downloaded file
                alert('The file has been downloaded. Please manually attach it in WhatsApp Web.');
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Please select a file to share.');
        }
    });
});
