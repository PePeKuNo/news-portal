$urls = @(
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5"
)

$imageNames = @(
    "featured-news.jpg",
    "lifestyle.jpg",
    "tech.jpg",
    "travel.jpg",
    "culture.jpg"
)

for ($i = 0; $i -lt $urls.Count; $i++) {
    $url = $urls[$i]
    $outputPath = "public\images\$($imageNames[$i])"
    
    Write-Host "Downloading $($imageNames[$i])..."
    Invoke-WebRequest -Uri $url -OutFile $outputPath
}
